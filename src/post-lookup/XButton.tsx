// ts-eslint-disable
/* eslint-disable  */
export default function XButton( props: { onClick: () => void } ) {
	return (
		<button onClick={ props.onClick } type="button"
      className="x-button components-button block-editor-inspector-popover-header__action has-icon" aria-label="Close">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
				<path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
			</svg>
		</button>
	);
}
/* eslint-enable  */
