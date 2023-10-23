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
          <div key={label}>
            <div>{label}</div>
            <div>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Popup;
