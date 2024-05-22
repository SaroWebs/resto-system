<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Product/List');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
    }



    public function get_products(Request $request){   
        // order, limit, page, pagination 
        $m = Menu::with('images')->paginate(50);
        return response()->json($m);
    }

    public function get_items(Request $request){   
        // order, limit, page, pagination 
        $m = Menu::with('images')->paginate(50);
        return response()->json($m);
    }
    
    public function get_items_by_category(Request $request, $cid){   
        $m = Menu::with('images')->where('category_id', $cid)->paginate(50);
        return response()->json($m);
    }
    
    public function get_item($id){    
        $m = Menu::with('images')->find($id);
        return response()->json($m);
    }
}
