import { Suspense } from "react";
import LoadingPage from "./LoadingPage";

interface IWithSuspenseProps {
  children: React.ReactNode;
}

const WithSuspense: React.FunctionComponent<IWithSuspenseProps> = ({ children }: IWithSuspenseProps) => {
    return (
        <Suspense fallback={<LoadingPage />}>
            {children}
        </Suspense>
    )
}

export default WithSuspense