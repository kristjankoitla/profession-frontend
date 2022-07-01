import Button from "./Button";

export interface FormProps {
  title: string;
  children: React.ReactNode;
  submitLabel: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Form(props: FormProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div
                  className="px-4 pt-6 sm:px-6 text-base font-medium text-gray-900"
                  aria-hidden="true"
                >
                  {props.title}
                </div>
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  {props.children}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                    label={props.submitLabel}
                    type="submit"
                    loading={props.loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
