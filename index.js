
// eslint-disable-next-line react-hooks/exhaustive-deps
const React = require('react')


function debounce(func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;

    // Calling debounce returns a new anonymous function
    return function () {
        // reference the context and args for the setTimeout function
        var context = this,
            args = arguments;

        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;

        // This is the basic debounce behaviour where you can call this 
        //   function several times, but it will only execute once 
        //   [before or after imposing a delay]. 
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function () {

            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;

            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);

        // Immediate mode and no wait timer? Execute the function..
        if (callNow) func.apply(context, args);
    }
}


// Deep proxy referance by
// https://stackoverflow.com/a/58983264
function createOnChangeProxy(onChange, target) {
    return new Proxy(target, {
        get(target, property) {
            const item = target[property]
            if (item && typeof item === 'object') return createOnChangeProxy(onChange, item)
            return item
        },
        set(target, property, newValue) {
            target[property] = newValue
            onChange()
            return true
        },
    })
}

module.exports = function useTrackedState(val) {
    const isObject = React.useRef(typeof val === "object")
    const [state, setState] = React.useState(isObject.current ? val : { value: val })
    const debounceSetState = React.useCallback(debounce(() => setState((v) => { return { ...v } }), 1));

    const proxyState = React.useRef(createOnChangeProxy(debounceSetState, state)).current

    return proxyState
}