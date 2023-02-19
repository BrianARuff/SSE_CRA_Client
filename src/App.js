import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [eventSource, setEventSource] = useState(null);
  const [eventSourceValue, setEventSourceValue] = useState(null);

  useEffect(() => {
    if (!eventSource) {
      const eventSource = new EventSource("http://127.0.0.1:8080");

      eventSource.onmessage = (event) => {
        setEventSourceValue(event.data);
      };

      setEventSource(eventSource);
    }
  }, [eventSource]);

  const stopEventSource = () => {
    eventSource.close();
  };

  const startEventSource = () => {
    const eventSource = new EventSource("http://127.0.0.1:8080");
    setEventSource(eventSource);
  };

  return (
    <div className="App">
      {eventSource && eventSourceValue ? (
        <>
          <h1>Server Sent Events</h1>
          <h2>{eventSourceValue}</h2>
          <button onClick={stopEventSource}>Stop EventSource</button>
          <button onClick={startEventSource}>Start EventSource</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
