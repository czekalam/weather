export const items = (state='', action) => {
    switch(action.type) {
        case 'SET_ITEMS':
            return action.items;
        default:
            return state;
    }
}
export const view = (state='',action) => {
    switch(action.type) {
        case 'SET_VIEW':
            return action.view
        default:
            return state;
    }
}
