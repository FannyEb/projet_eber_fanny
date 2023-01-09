import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProduct, DeleteProduct } from "./shopping-action";
import { ShoppingStateModel } from "./shopping-state-model";

@State<ShoppingStateModel>({
    name: 'products',
    defaults: {
        products: [],
    },
})

@Injectable()
export class ShoppingState {
    @Selector()
    static getNbProducts(state: ShoppingStateModel) {
        //somme des quantités
        return state.products.reduce((acc, product) => acc + product.quantity, 0);
    }
    @Selector()
    static getListProducts(state: ShoppingStateModel) {
        return state.products;
    }
    @Selector()
    static getTotalPrice(state: ShoppingStateModel) {
        //somme des prix * quantité
        return state.products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
    }

    @Action(AddProduct)
    add(
        { getState, patchState }: StateContext<ShoppingStateModel>,
        { payload }: AddProduct
    ) {
        const state = getState();
        patchState({
            //add product if not already in the list or increment quantity
            products: state.products.find((t) => t.id === payload.id)
                ? state.products.map((t) =>
                    t.id === payload.id ? { ...t, quantity: t.quantity + 1 } : t
                )
                : [...state.products, { ...payload, quantity: 1 }],
        });
    }

    @Action(DeleteProduct)
    delete(
        { getState, patchState }: StateContext<ShoppingStateModel>,
        { payload }: DeleteProduct
    ) {
        const state = getState();
        patchState({
            //delete product if quantity is 1 or decrement quantity
            products: state.products.find((t) => t.id === payload.id)?.quantity === 1
                ? state.products.filter((t) => t.id !== payload.id)
                : state.products.map((t) =>
                    t.id === payload.id ? { ...t, quantity: t.quantity - 1 } : t
                ),
        });
    }
}