import { useState, useEffect } from 'react';

/**
 * Nice debounce as a custom hook.
 * In our case, We set a delay before the onkeydown event is triggered,
 * so we optimize the number of queries made by fetchAPI
 */

function useDebounce<T>( value: T, delay: number ): T {
	const [ debouncedValue, setDebouncedValue ] = useState<T>( value );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );

		return () => {
			clearTimeout( handler );
		};
	}, [ value, delay ] );

	return debouncedValue;
}

export default useDebounce;
