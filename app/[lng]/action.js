'use server'

import { redirect } from 'next/navigation'
import {addNote, updateNote, delNote} from '@/lib/redis';
import {revalidatePath} from "next/cache";
import { z } from 'zod'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const schema = z.object({
    title: z.string(),
    content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
})

export async function saveNote(prevState, formData) {
    console.log('formData', formData)
    const noteId = formData.get('noteId')

    const data = {
        title: formData.get('title'),
        content: formData.get('body'),
        updateTime: new Date()
    }

    const validated = schema.safeParse(data)
    if (!validated.success) {
        return {
            errors: validated.error.errors
        }
    }

    await sleep(2000)

    if (noteId) {
        await updateNote(noteId, JSON.stringify(data))
        revalidatePath('/', 'layout')
        redirect(`/note/${noteId}`)
    } else {
        const res = await addNote(JSON.stringify(data))
        revalidatePath('/', 'layout')
        redirect(`/note/${res}`)
    }

    return {
        message: 'Note saved successfully'
    }
}

export async function deleteNote(prevState, formData) {
    const noteId = formData.get('noteId')
    await delNote(noteId)
    redirect('/')
}
