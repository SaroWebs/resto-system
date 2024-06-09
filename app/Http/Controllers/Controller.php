<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Customer;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function statistics()
    {
        $views = 3296;
        $profit = 590690;
        $products = Menu::get()->count();
        $customers = Customer::get()->count();
        
        return [
            'views'=>$views,
            'profit'=>$profit,
            'products'=>$products,
            'customers'=>$customers,
        ];
    }
}
