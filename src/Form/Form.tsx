export interface FormProps {
  title: string;
  children: React.ReactNode;
  submitLabel: string;
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
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {props.submitLabel}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
