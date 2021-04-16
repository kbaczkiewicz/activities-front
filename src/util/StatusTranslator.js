export const translateIntervalStatus = status => {
    const statuses = {
        'new': 'Nowy',
        'draft': 'Kopia robocza',
        'saved': 'Zapisany',
        'started': 'Rozpoczęty',
        'ended': 'Zakończony'
    };

    for (const [key, value] in statuses) {
        if (key === status) {
            return value;
        }
    }

    return null;
};
