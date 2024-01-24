import Homepage from "./HomePage"
import Map from "./MapPage"
import Mention from "./MentionPage"
import Names from "./NamesPage"
import Book from "./BookPage"
import Calendar from "./CalendarPage"
import NamePage from "./NamePage"
import SurahPage from "./SurahPage"

export const routes = [{
        id: 1,
        path: "/",
        element: < Homepage />
    },
    {
        id: 2,
        path: "/zikr",
        element: < Mention />
    },
    {
        id: 3,
        path: "/qur'on",
        element: < Book />
    },
    {
        id: 4,
        path: "/ismlar",
        element: < Names />
    },
    {
        id: 5,
        path: "/xarita",
        element: < Map />
    },
    {
        id: 6,
        path: "/kalendar",
        element: < Calendar />
    },
    {
        id: 7,
        path: "ismlar/:id",
        element: < NamePage />
    },
    {
        id: 8,
        path: "suralar/:id",
        element: < SurahPage />
    }
]