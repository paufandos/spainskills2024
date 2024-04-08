<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class ReservationController extends Controller
{
    public function findUserReservations(Request $request)
    {
        try {
            $user = $request->user();
            if ($user->administrator) {
                $reservations = Reservation::with('user')->with('table')->get();
            } else {
                $reservations = Reservation::with('user')->with('table')->where("user_id", $user->id)->get();
            }
            return response()->json($reservations, 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Ups! Algo a ido mal, no se ha podido completar tu accion."], 500);
        }
    }

    public function filterReservationByDate(Request $request)
    {
        try {
            $user = $request->user();
            $validator = Validator::make($request->all(), [
                'date' => 'required|date'
            ]);

            if ($validator->fails()) {
                return response()->json(["message" => "Los datos de entrada no son correctos."], 400);
            }
            if ($user->administrator) {
                $reservations = Reservation::with('user')
                    ->with('table')
                    ->where('start_date', '<=', $request->query('date'))
                    ->where('end_date', '>=', $request->query('date'))
                    ->get();
            } else {
                $reservations = Reservation::with('user')->with('table')
                    ->where("user_id", $user->id)
                    ->where('start_date', '<=', $request->query('date'))
                    ->where('end_date', '>=', $request->query('date'))
                    ->get();
            }
            return response()->json($reservations, 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Ups! Algo a ido mal, no se ha podido completar tu accion."], 500);
        }
    }

    public function filterReservationByUsername(Request $request)
    {
        try {
            $user = $request->user();
            $validator = Validator::make($request->all(), [
                'username' => 'required|string'
            ]);
            $username = $request->username;

            if ($validator->fails()) {
                return response()->json(["message" => "Los datos de entrada no son correctos."], 400);
            }

            if (!$user->administrator) {
                return response()->json(["message" => "No esta autorizado para hacer esta consulta."], 401);
            }

            $reservations = Reservation::with('user')->with('table')
                ->whereHas("user", function ($query) use ($username) {
                    $query->where('username', $username);
                })
                ->get();
            return response()->json($reservations, 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Ups! Algo a ido mal, no se ha podido completar tu accion."], 500);
        }
    }
}
