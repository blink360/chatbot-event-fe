import { useQuery } from "@tanstack/react-query";
import { Button, Card, Spinner } from "react-bootstrap";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import { getEvents } from "src/lib/services/eventService";
import EventCard from "src/components/cards/EventCard";

const Dashboard = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["events"],
        queryFn: getEvents
    });

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between">
                <h2 className="mb-4">Scheduled Events</h2>
            </div>

            {isLoading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {isError && <p>Failed to load events</p>}

            {data && data.length === 0 && <p>No events found</p>}

            <div className="d-grid gap-3 mt-3">
                {data?.map((event: any) => (
                    <EventCard event={event} />
                ))}
            </div>
        </div>
    );
};

export default withProtectedRoute(Dashboard);