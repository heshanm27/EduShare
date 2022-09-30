import {
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import CustomeIconButton from "../../components/IconButton/CustomeIconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { motion } from "framer-motion";
import { container, item, itemBtn } from "../Animations/Animations";
import { NavLinks } from "../../Constants/Constants";
import CustomeIconButton from "../CustomeIconButton/CustomeIconButton";
const navArray = [
  {
    url: "#",
    label: "Home",
  },
  {
    url: "#about",
    label: "About",
  },
  {
    url: "#journy",
    label: "Journy",
  },
  {
    url: "#experience",
    label: "Experience",
  },
  {
    url: "#protfolio",
    label: "Protfolio",
  },
  {
    url: "#contact",
    label: "Contact",
  },
];

const socialBtnArr = [
  {
    Icon: <FacebookIcon />,
    label: "Facebook",
    url: "https://www.facebook.com/hashan.madaranga.7/",
  },
  {
    Icon: <InstagramIcon />,
    label: "Instagram",
    url: "https://www.instagram.com/heshanmadhurang/",
  },
  {
    Icon: <TwitterIcon />,
    label: "Twitter",
    url: "https://twitter.com/HeshanMaduran15",
  },
];

export default function Footer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      id="footer"
      style={{
        backgroundColor: "#40C4FF",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.5 }}
          exit="exit"
        >
          <motion.div variants={item}>
            <Typography align="center" variant="h2">
              EduShare
            </Typography>
          </motion.div>
          <motion.div variants={item}>
            <Stack
              direction={matches === true ? "column" : "row"}
              justifyContent="center"
              alignItems={"center"}
            >
              {NavLinks.map((nav) => {
                return (
                  <Link
                    variant="h6"
                    color="black"
                    underline="hover"
                    href={nav.path}
                    sx={{ padding: "10px" }}
                  >
                    {nav.title}
                  </Link>
                );
              })}
            </Stack>
          </motion.div>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            {socialBtnArr.map((social) => {
              return (
                <motion.div variants={itemBtn}>
                  <CustomeIconButton
                    Icon={social.Icon}
                    label={social.label}
                    url={social.url}
                    isScoial={true}
                  />
                </motion.div>
              );
            })}
          </Stack>
          <motion.div variants={item}>
            <Typography
              sx={{ paddingTop: "10px" }}
              variant="body2"
              color="textSecondary"
              align="center"
            >
              {"Copyright © "}
              <Link color="inherit">EduShare</Link> {new Date().getFullYear()}
              {"."}
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
