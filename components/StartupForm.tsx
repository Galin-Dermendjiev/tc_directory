"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from 'zod'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";

export default function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [pitch, setPitch] = useState<string>('');
  const { toast } = useToast()
  const router = useRouter()
  
  async function handleFormSubmit(previousState: any, formData: FormData){
    try {
        const formValues = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            link: formData.get('link'),
            pitch
        }
        //test image
        //https://images.pexels.com/photos/26698447/pexels-photo-26698447.jpeg
        await formSchema.parseAsync(formValues)

        const result = await createStartup(previousState, formData, pitch)
        console.log(result)
        if(result.status === "SUCCESS"){
            toast({
                title: 'Success',
                description: 'Your startup has been created successfully'
            })
            router.push(`/startups/${result._id}`)
        }
        return result

    } catch (error) {
        if(error instanceof z.ZodError) {
            const fieldErors = error.flatten().fieldErrors
            setErrors(fieldErors as unknown as Record<string, string>)

            toast({
                title: 'Error',
                description: 'Please check your inputs and try again.',
                variant: 'destructive'
            })
            return {...previousState, error: 'Validation failed', status: "ERROR"}
        }

        toast({
                title: 'Error',
                description: 'An unexpected error has occured',
                variant: 'destructive'
            })
        return {
            ...previousState, error: 'An unexpected error has occured', status: "ERROR"
        }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: 'INITIAL'})

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Energy...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{borderRadius: 20, overflow: 'hidden'}}
          textareaProps={{
            placeholder: 'Briefly describe your idea'
          }}
          previewOptions={{disallowedElements: ['style']}}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Your Startup'}
        <Send className="size-6 ml-2"/>
      </Button>
    </form>
  );
}
