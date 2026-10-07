import {create} from "zustand"
const useQuantityStore = create(
    (set) => ({
        quantity: {},

        increament: (id) => 
            set((state) => ({
                quantity: {
                    ...state.quantity,
                    [id] : (state.quantity[id] || 1) +1
                }

            })),

            decreament: (id) => 
                set((state) => {
                    const currentQuantity = state.quantity[id] || 1
                    if (currentQuantity <= 1) {
                        return state
                    }
                    return{
                        quantity: {
                            ...state.quantity, [id]: currentQuantity -1
                        }
                    }
                   
                })

    })
)
export default useQuantityStore;