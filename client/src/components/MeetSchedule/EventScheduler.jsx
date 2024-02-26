// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import './EventScheduler.css'
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import enUS from "date-fns/locale/en-US";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { GoogleLogin } from "react-google-login";

// const EventScheduler = () => {
//   const locales = {
//     "en-US": enUS,
//   };

//   const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
//   });

//   return (

//     <div>
//          <GoogleLogin
//         clientId={CLIENT_ID}
//         buttonText="Login with Google"
//         onSuccess={handleLoginSuccess}
//         onFailure={(error) => console.error("Google login failed:", error)}
//         cookiePolicy={"single_host_origin"}
//          />

//         <Calendar
//         className="bg-white p-4 rounded shadow"
//         localizer={localizer}
//         // events={allEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
      
//   );
// };

// export default EventScheduler;
