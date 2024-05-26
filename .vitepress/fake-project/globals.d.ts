import '@kitajs/html';

declare global {
  /** A sample code to detect is something went wrong */
  const somethingWentWrong: boolean;

  /** A sample code to detect is something went wrong */
  const somethingWentWrong2: boolean;

  /** A sample function that may throw an error */
  function myFnThatThrows(errors?: unknown): void;

  /**
   * A sample function that does some async work, such as loading data from a
   * database and rendering it into <li>s
   */
  function MyAsyncComponent(): JSX.Element;

  /**
   * A sample function that does some async work in the fallback. This async
   * work will be waited Synchronously.
   */
  function MyAsyncFallback(): JSX.Element;

  /** A sample function that renders a username */
  function Username({ name }: Props): JSX.Element;

  interface Props {
    name?: string;
    description?: string;
    date?: Date;
    about?: string;
  }

  /**
   * Sample of a layout component that uses suspense to render a loading spinner
   * while the content is being fetched
   */
  const LayoutWithSuspense: Html.Component<{
    /** The current request id */
    rid: number | string;
  }>;

  /** Sample of a layout component that uses suspense to render a loading spinner */
  function syncDbQuery(): { username: string };
}
