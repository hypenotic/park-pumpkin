export const getters = {
    allLocations: state => {
        return state.locationList
    },
    allActivities: state => {
        return state.activityList
    },
    allActiveEvents: state => {
        return state.activeEvents
    },
    activeMarkers: state => {
        return state.activeMarkers
    },
    activeInfoWindows: state => {
        return state.activeInfoWindows
    }
}