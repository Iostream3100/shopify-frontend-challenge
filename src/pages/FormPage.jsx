// import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Rating,
  TextField,
  Button,
  Typography,
  InputLabel,
  Box,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { useBackdropContext } from "../context/BackdropContext";
import ResponseCard from "../components/ResponseCard";

const validationSchema = yup.object({
  prompt: yup.string().required("Prompt is required"),
});

const key = "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";
const FormPage = () => {
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();

  const [res, setRes] = useState("");
  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      addBackdrop("Fetching Data");

      setTimeout(async () => {
        try {
          const data = {
            prompt: values.prompt,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            stream: false,
            presence_penalty: 0.0,
          };

          const response = await fetch(
            "https://api.openai.com/v1/engines/text-curie-001/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`,
              },
              body: JSON.stringify(data),
            }
          );
          setRes(await response.json());
          setBackdropOpen(false);
          addNotification("Success!");
          setSubmitting(false);
        } catch (err) {
          console.log(err);
        }
      }, 200);
    },
  });

  return (
    <>
      <Box
        sx={{
          paddingX: "15vw",
          paddingY: "6vh",
        }}
      >
        <Typography variant={"h4"} sx={{ fontWeight: "bold" }}>
          Fun with AI
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ paddingY: "3vh" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  fontSize: 22,
                  color: "#444",
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                  marginBottom: "0.3vh",
                }}
              >
                Prompt
              </Typography>
            </Box>
            <TextField
              id="prompt"
              multiline
              rows={4}
              color="success"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "100%" }}
              type="text"
              name="prompt"
              size="small"
              placeholder="Enter your prompts here"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.prompt}
              error={
                Boolean(formik.errors.prompt) && Boolean(formik.touched.prompt)
              }
              helperText={
                Boolean(formik.errors.prompt) && Boolean(formik.touched.prompt)
                  ? formik.errors.prompt
                  : " "
              }
            />

            <Button
              color="success"
              variant="outlined"
              type="submit"
              size={"medium"}
            >
              Submit
            </Button>
          </Box>
        </form>

        <Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              htmlFor="prompt"
              sx={{
                fontSize: 22,
                color: "#444",
                alignSelf: "flex-start",
                fontWeight: "bold",
                marginBottom: "0.3vh",
              }}
            >
              Responses
            </Typography>
          </Box>
          {res && (
            <ResponseCard
              prompt={formik.values.prompt}
              response={res.choices[0].text}
            />
            // <Box>
            //   <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
            //     {res.choices[0].text}
            //   </Typography>
            // </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FormPage;
