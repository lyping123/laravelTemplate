<?php

namespace App\Http\Controllers;

use App\Models\buyer;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class buyerController extends Controller
{
    public function index()
    {
        return Inertia::render('buyer/index');
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            "buyer_name" => "required",
            "ic" => "required",
            "contact_number" => "required",
            "line_address" => "required",
            "state" => "required",
            "zipcode" => "required",
            "country" => "required"
        ]);


        $buyer = buyer::create($validated);
        if ($buyer) {
            return Redirect()->route("dashboard")->with("success", "add buyer success");
        }
        return back()->with("error", "add buyer fail");
    }
}
