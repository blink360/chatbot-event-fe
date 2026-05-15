import { NextPage } from "next";
import Chatbot from "src/components/Chatbot";
import withProtectedRoute from "src/hoc/withProtectedRoute";

const IndexPage: NextPage = () => {
    return <Chatbot />
}

export default withProtectedRoute(IndexPage);