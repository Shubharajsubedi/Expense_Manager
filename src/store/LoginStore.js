import { create } from "zustand";

const useLoginStore = create(
    (set) => ({
        user:null,

        loggedinUser: (userdata) => {
            set({user:userdata})
        },

        loggedoutUser:() => {
            set({authUser:null})
        }
    })
)

export default useLoginStore;