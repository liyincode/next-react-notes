import {useFormStatus} from "react-dom";

export default function SaveButton({formAction}) {
    const {pending} = useFormStatus()
    return (
        <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            role="menuitem"
            formAction={formAction}
        >
            <img
                src="/checkmark.svg"
                width="14px"
                height="10px"
                alt=""
                role="presentation"
            />
            {pending ? 'Saving...' : 'Save'}
        </button>
    )
}
