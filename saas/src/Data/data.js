import ecosystem from "../assets/ecosystem.svg";
import goal from "../assets/goal.svg";
import encryption from "../assets/encryption.svg";
import notifications from "../assets/notifications.svg";
import alex from "../assets/alex.svg";
import casey from "../assets/casey.svg";
import jordan from "../assets/jordan.svg";
import josh from "../assets/josh.svg";
import taylor from "../assets/taylor.svg";
import sam from "../assets/sam.svg";
import morgan from "../assets/morgan.svg";
import riley from "../assets/riley.svg";
import caseyHarper from "../assets/casey-harper.svg";

export const productCardsData = [
  {
    id: Date.now(),
    img: ecosystem,
    title: "Integration ecosystem",
    description: "Track your progress and motivate your efforts everyday.",
    button: "Learn more",
  },
  {
    id: Date.now(),
    img: goal,
    title: "Goal setting and tracking",
    description: "Set and track goals withmanageable task breakdowns.",
    button: "Learn more",
  },
  {
    id: Date.now(),
    img: encryption,
    title: "Secure data encryption",
    description: "Ensure your data s safety with top-tier encryption.",
    button: "Learn more",
  },
  {
    id: Date.now(),
    img: notifications,
    title: "Customizable notifications",
    description: "Get alerts on tasks and deadlinesthat matter most.",
    button: "Learn more",
  },
];

export const pricingData = [
  {
    id: Date.now(),
    planType: "Free",
    price: 0,
    duration: "monthly",
    button: "Get started for free",
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    id: Date.now(),
    planType: "Pro",
    price: 9,
    duration: "monthly",
    button: "Sign up now",
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    id: Date.now(),
    planType: "Business",
    price: 19,
    duration: "monthly",
    button: "Sign up now",
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const TestimonialsData = [
  {
    id: Date.now(),
    description:
      "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    userImg: alex,
    displayName: "Alex Rivera",
    userName: "@jamietec",
  },
  {
    id: Date.now(),
    description:
      "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    userImg: casey,
    displayName: "Casey Jordan",
    userName: "@caseyj",
  },
  {
    id: Date.now(),
    description:
      "Adopting this app for our team has streamlined our project management and improved communication across the board. ",
    userImg: jordan,
    displayName: "Jordan Patels",
    userName: "@jpatelsdesign",
  },
  {
    id: Date.now(),
    description:
      "Our team’s productivity has skyrocketed since we started using this tool. ",
    userImg: josh,
    displayName: "Josh Smith",
    userName: "@jjsmith",
  },
  {
    id: Date.now(),
    description:
      "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    userImg: taylor,
    displayName: "Taylor Kim",
    userName: "@taylorkimm",
  },
  {
    id: Date.now(),
    description:
      "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    userImg: sam,
    displayName: "Sam Dawson",
    userName: "@dawsontechtips",
  },
  {
    id: Date.now(),
    description:
      "This app has completely transformed how I manage my projects and deadlines.",
    userImg: morgan,
    displayName: "Morgan Lee",
    userName: "@morganleewhiz",
  },
  {
    id: Date.now(),
    description:
      "The customizability and integration capabilities of this app are top-notch.",
    userImg: riley,
    displayName: "Riley Smith",
    userName: "@rileysmith1",
  },
  {
    id: Date.now(),
    description:
      "Its user-friendly interface and robust features support our diverse needs.",
    userImg: caseyHarper,
    displayName: "Casey Harper",
    userName: "@casey09",
  },
];
