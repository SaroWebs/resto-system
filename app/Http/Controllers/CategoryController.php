<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Categories/List');
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
        $request->validate([
            'name' => 'required',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:1024'
        ]);

        $imageUrl = '';
        if ($request->file('image')) {
            $imageUrl = $request->file('image')->store('public/images/categories');
            $imageUrl = str_replace('public/', 'storage/', $imageUrl);
        }
        $iconUrl = '';
        if ($request->file('icon')) {
            $iconUrl = $request->file('icon')->store('public/images/categories/icons');
            $iconUrl = str_replace('public/', 'storage/', $iconUrl);
        }
        $parent = null;
        if ($request->parent_id) {
            $parent = Category::find($request->parent_id);
        }

        $c = new Category();
        $c->name = $request->name;
        $c->description = $request->description ?? '';
        $c->image_url = $imageUrl;
        $c->icon_url = $iconUrl;
        $c->parent_id = $parent ? $request->parent_id : '';
        $c->is_root = $request->is_root;
        $c->active = $request->active;
        $c->created_at = now();
        $c->save();


        return response()->json(['message' => 'Category has been ceated!', 'item' => $c], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }

    public function get_items()
    {
        $c = Category::get();
        return response()->json($c);
    }

    public function get_item($id)
    {
        $c = Category::find($id);
        return response()->json($c);
    }
}
