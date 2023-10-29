import React from "react";

type Message = {};
type CallbackResponse = {
  label: string;
  value: string | null | undefined;
}[];

type State = {
  isLoading: boolean;
  pageMetas: CallbackResponse;
};
const initialState: State = {
  isLoading: true,
  pageMetas: [],
};

const Popup: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(initialState.isLoading);
  const [pageMetas, setPageMetas] = React.useState(initialState.pageMetas);

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage<Message, CallbackResponse>(
        tabs[0].id!,
        {},
        (response) => {
          setPageMetas(response);
          setIsLoading(false);
        }
      );
    });
  }, []);

  if (isLoading) return null;
  return (
    <div>
      {pageMetas.map((meta) => {
        const { label, value } = meta;
        if (!value) return null;
        return (
          <div key={label} className="pagemeta-container">
            <div className="pagemeta-label">{label}</div>
            <div className="pagemeta-value-container">
              <div className="pagemeta-value">{value}</div>
              <button
                className="pagemeta-copy-button"
                onClick={async () => {
                  await global.navigator.clipboard.writeText(value);
                }}
              >
                Copy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Popup;
