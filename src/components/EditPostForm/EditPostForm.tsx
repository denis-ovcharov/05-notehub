import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./EditPostForm.module.css";
import * as Yup from "yup";
import type { Note, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface EditPostFormProps {
  note: Note;
  onClose: () => void;
}
interface InitialValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function EditPostForm({ onClose, note }: EditPostFormProps) {
  const initialValues: InitialValues = {
    title: note.title,
    content: note.content,
    tag: note.tag,
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      toast.success("Note edited successfully!");
    },
    onError() {
      toast.error("There was an error");
    },
  });

  const handleEdit = (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>,
  ) => {
    mutate(
      {
        id: note.id,
        noteData: values,
      },
      {
        onSuccess() {
          actions.resetForm();
        },
      },
    );
  };

  const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long")
      .required("Name is required"),
    content: Yup.string().max(500, "Content is too long. Max 500 characters"),
    tag: Yup.string().oneOf(tags, "Invalid tag").required("Tag is required"),
  });

  return (
    <>
      <Formik
        onSubmit={handleEdit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage component="span" name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage component="span" name="tag" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              Edit note
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
