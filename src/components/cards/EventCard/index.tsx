import { Card, Badge } from "react-bootstrap";

interface EventCardProps {
    event: {
        id: string;
        name?: string;
        subheading?: string;
        description?: string;
        timezone?: string;
        startDate?: string | Date;
        endDate?: string | Date;
        roles?: string[];
        bannerImage?: string;
    };
};

const EventCard = ({ event }: EventCardProps) => {
    return (
        <Card className="p-3 shadow-sm mb-3">
            {event.bannerImage && (
                <img
                    src={event.bannerImage}
                    alt="banner"
                    style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginBottom: "10px",
                    }}
                />
            )}

            <h5>{event.name || "Untitled Event"}</h5>

            {event.subheading && (
                <p className="text-muted mb-1">{event.subheading}</p>
            )}

            {event.description && (
                <p className="mb-2">{event.description}</p>
            )}

            <div className="mb-2">
                <small className="text-muted">
                    {event.timezone && <>📍 {event.timezone} • </>}
                    {event.startDate && (
                        <>
                            {new Date(event.startDate).toLocaleString()} →{" "}
                        </>
                    )}
                    {event.endDate && (
                        <>{new Date(event.endDate).toLocaleString()}</>
                    )}
                </small>
            </div>

            {event.roles && event.roles.length > 0 && (
                <div className="d-flex gap-2 flex-wrap">
                    {event.roles.map((role, idx) => (
                        <Badge key={idx} bg="secondary">
                            {role}
                        </Badge>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default EventCard;