import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { useBackdropContext } from "../context/BackdropContext";
import ResponseCard from "../components/ResponseCard";

const validationSchema = yup.object({
  prompt: yup.string().required("Prompt is required"),
});

const FormPage = () => {
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();

  const [resHistory, setResHistory] = useState([]);
  useEffect(() => {
    const storedResHistory = JSON.parse(localStorage.getItem("resHistory"));
    if (storedResHistory) {
      setResHistory(storedResHistory);
    }
  }, []);

  useEffect(() => {
    if (resHistory.length > 0) {
      localStorage.setItem("resHistory", JSON.stringify(resHistory));
    }
  }, [resHistory]);

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
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
              },
              body: JSON.stringify(data),
            }
          ).then((res) => res.json());
          setResHistory((prevHistory) => [
            { prompt: values.prompt, response: response.choices[0].text },
            ...prevHistory,
          ]);
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

      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            Responses
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{
              fontSize: 16,
              color: "#666",
              alignSelf: "flex-start",
              marginBottom: "0.3vh",
            }}
          >
            History is stored in local storage, you can try refreshing the page.
          </Typography>
        </Box>

        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            localStorage.removeItem("resHistory");
            setResHistory([]);
          }}
          size="small"
          sx={{ alignSelf: "flex-start", my: "8px" }}
        >
          Clear history
        </Button>

        {resHistory.length > 0 && (
          <>
            {resHistory.map((res, index) => (
              <ResponseCard
                prompt={res.prompt}
                response={res.response}
                key={index}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FormPage;
