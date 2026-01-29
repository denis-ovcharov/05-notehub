import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";

interface InitialValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: InitialValues = {
  title: "",
  content: "",
  tag: "Work",
};

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const handleSubmit = async (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>,
  ) => {
    await new Promise((r) => setTimeout(r, 3000));
    console.log(values);
    actions.resetForm();
  };
  return (
    <>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage component="span" name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
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
            <select id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
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
              Create note
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
