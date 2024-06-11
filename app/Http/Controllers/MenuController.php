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


    public function get_items(Request $request)
    {
        $order = $request->input('order', 'asc');
        $order_by = $request->input('order_by', 'name');
        $per_page = $request->input('per_page', 50);
        $search = $request->input('search', '');
        $cat_id = $request->input('category_id', '');

        $query = Menu::query();
        // only the active products for application
        $query->where('active', 1);

        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        }
        if (!empty($cat_id)) {
            $query->where('category_id', $cat_id);
        }

        $query->orderBy($order_by, $order);

        $m = $query->with('images')->paginate($per_page);
        return response()->json($m);
    }

    
    public function get_item($id)
    {
        $m = Menu::with('images')->find($id);
        if($m->active){
            return response()->json($m);
        }else{
            return response()->json(null);
        }

    }

    // system
    public function get_products(Request $request)
    {
        $order = $request->input('order', 'asc');
        $order_by = $request->input('order_by', 'name');
        $per_page = $request->input('per_page', 50);
        $search = $request->input('search', '');
        $cat_id = $request->input('category_id', '');

        $query = Menu::query();


        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        }

        if (!empty($cat_id)) {
            $query->where('category_id', $cat_id);
        }

        $query->orderBy($order_by, $order);

        $m = $query->with('images')->paginate($per_page);
        return response()->json($m);
    }


}
