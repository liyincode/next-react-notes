'use client'

import {useRouter} from "next/navigation";
import {useTransition} from "react";

export default function SidebarImport() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const onChange = async (e) => {
        const fileInput = e.target;

        if (!fileInput.files || fileInput.files.length === 0) {
            console.warn("files list is empty");
            return;
        }

        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("something went wrong");
                return;
            }

            const data = await response.json();

            startTransition(() => router.push(`/note/${data.uid}`))
            startTransition(() => router.refresh())

        } catch (error) {
            console.error("something went wrong");
        }

        // 重置 file input
        e.target.type = "text";
        e.target.type = "file";
    };

    return (
        <form method="post" enctype="multipart/form-data">
            <div style={{textAlign: "center"}}>
                <label for="file" style={{cursor: 'pointer'}}>Import .md File</label>
                <input onChange={ onChange } type="file" id="file" name="file" multiple style={{position: "absolute", clip: "rect(0 0 0 0)"}}/>
            </div>
        </form>
    )
}
