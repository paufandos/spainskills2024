<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TableController extends Controller
{
    public function filter(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'width' => 'integer',
            'height' => 'integer',
            'game' => 'string',
            'date' => 'date'
        ]);

        if ($validation->fails()) {
            return response()->json(['message' => 'Los datos de búsquda no son corectos'], 400);
        }

        $query = Table::query();

        if ($request->query('width')) {
            $query->where('width', '>=', $request->query('width'));
        }

        if ($request->query('height')) {
            $query->where('height', '>=', $request->query('height'));
        }

        if ($request->query('game')) {
            $game = Game::where('game_id', $request->query('game'))->first();
            $query->where('width', '>=', $game->width)->where('height', '>=', $game->height);
        }

        if ($request->query('date')) {
            $tables = Reservation::with('table')->select('table')->where('start_date', '<=', $request->query('date'))
                ->where('end_date', '>=', $request->query('date'))
                ->where('start_date', '<=', $request->query('date'));
        }
    }
}
