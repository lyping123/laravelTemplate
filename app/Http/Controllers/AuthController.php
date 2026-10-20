<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function createLogin(): Response
    {
        return Inertia::render('auth/login');
    }

    public function dashboard(): Response
    {
        return Inertia::render('dashboard');
    }

    public function createUserInformation(): Response
    {
        $user = request()->user()->load(['userInformation', 'userAddress']);
        $states = ['Johor', 'Pulau Pinang', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'];
        $address = [
            'address' => $user->userAddress->first()?->address ?? '',
            'city' => $user->userAddress->first()?->city ?? '',
            'states' => $states,
            'selectedState' => $user->userAddress->first()?->state ?? '',
            'zip_code' => $user->userAddress->first()?->zip_code ?? '',
        ];

        return Inertia::render('user-information', [
            'userInformation' => $user->userInformation,
            'address' => $address
        ]);
    }

    public function storeLogin(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['boolean'],
        ]);

        if (! Auth::attempt([
            'email' => $validated['email'],
            'password' => $validated['password'],
        ], $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'Those credentials do not match our records.']);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    public function createRegistration(): Response
    {
        return Inertia::render('auth/register');
    }

    public function storeRegistration(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);
        event(new Registered($user));

        return redirect()->route('verification.notice');
    }

    public function showVerification(): Response|RedirectResponse
    {
        if (request()->user()?->hasVerifiedEmail()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/verify-email', [
            'status' => session('status'),
        ]);
    }

    public function sendVerification(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route('dashboard');
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }

    public function verifyEmail(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->route('dashboard');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->route('dashboard')->with('status', 'email-verified');
    }

    public function destroySession(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function addUserinformation(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'ic' => ['required', 'string', 'max:255'],
            'tin_number' => ['nullable', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'required_with:city,state,zip_code', 'string', 'max:255'],
            'city' => ['nullable', 'required_with:address,state,zip_code', 'string', 'max:255'],
            'state' => ['nullable', 'required_with:address,city,zip_code', 'string', 'max:255'],
            'zip_code' => ['nullable', 'required_with:address,city,state', 'string', 'max:20'],
        ]);

        $user = $request->user();

        $qry = "select * from user u inner join user_information ui on u.id=ui.user_id where user_id=" . $user->id;
        $user->userInformation()->updateOrCreate([], [
            'name' => $validated['name'],
            'ic' => $validated['ic'],
            'tin_number' => $validated['tin_number'] ?? null,
            'phone_number' => $validated['phone_number'],
        ]);

        if ($request->filled('address')) {
            $user->userAddress()->updateOrCreate([], [
                'address' => $validated['address'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'zip_code' => $validated['zip_code'],
            ]);
        }

        return back()->with('status', 'information-added');
    }

    public function addUserAddress(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'zip_code' => ['required', 'string', 'max:20'],
        ]);

        $user = $request->user();
        $user->userAddress()->create($validated);

        return redirect()->route('dashboard')->with('status', 'address-added');
    }
}
