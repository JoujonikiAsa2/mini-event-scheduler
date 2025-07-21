const getEventFromDB = () => {
    const response = {
        success: true,
        message: 'Events fetched successfully',
    };

    return response;
};

export const EventServices = {
    getEventFromDB,
};
