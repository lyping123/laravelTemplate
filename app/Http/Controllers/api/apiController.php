<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class apiController extends Controller
{
    // This is the API controller for the MyInvois API
    private $client_id;
    private $client_secret1;
    private $client_secret2;
    public function __construct()
    {
        $this->client_id = env('client_id');
        $this->client_secret1 = env('client_secret1');
        $this->client_secret2 = env('client_secret2');
    }

    public function getAccessToken()
    {
        $client_id = $this->client_id;
        $client_secret1 = $this->client_secret1;
        $client_secret2 = $this->client_secret2;

        $response = Http::asform()->post('https://preprod-api.myinvois.hasil.gov.my/connect/token', [
            'grant_type' => 'client_credentials',
            'client_id' => $client_id,
            'client_secret' => $client_secret1,
            'scope' => 'InvoicingAPI',
        ]);

        if ($response->successful()) {
            return $response->json()['access_token'];
        } else {
            return response()->json(['error' => 'Unable to get access token'], 500);
        }
    }

    public function getTinNumber(Request $request)
    {
        $accessToken = $this->getAccessToken();
        if (!$accessToken) {
            return response()->json(['error' => 'Access token is required'], 401);
        }

        $ic = $request->input('ic');
        $response = Http::withHeaders([
            'authorization' => $accessToken,
        ])->get('https://preprod-api.myinvois.hasil.gov.my/api/v1.0/taxpayer/search/tin?idType=NRIC&idValue=' . $ic);

        if ($response->successful()) {
            return response()->json($response->json(), 200);
        } else {
            return response()->json(['error' => 'Unable to get TIN number'], 200);
        }
    }
}
