import React from "react";
import { default as ReactMarkdown } from "react-markdown";
import {
  Box,
  createTheme,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import remarkGfm from "remark-gfm";
import { default as SyntaxHighlighter } from "react-syntax-highlighter";
import { stackoverflowDark as darkHighlightStyle } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function FormattedText({ children }) {
  const zips = [
    ["h1", "h2", "h3", "h4", "h5"],
    [0.5, 0.6, 0.7, 0.8, 0.9],
  ];
  const theme = useTheme();

  const formattedTextTheme = createTheme({
    palette: { mode: "dark" },
    typography: {
      h1: { fontSize: theme.typography.h1.fontSize * 0.5 },
      h2: { fontSize: theme.typography.h2.fontSize * 0.6 },
      h3: { fontSize: theme.typography.h3.fontSize * 0.7 },
      h4: { fontSize: theme.typography.h4.fontSize * 0.8 },
      h5: { fontSize: theme.typography.h5.fontSize * 0.9 },
    },
  });

  return (
    <ThemeProvider theme={formattedTextTheme}>
      <Box
        sx={{
          "& pre": {
            overflowY: "visible !important",
            overflowX: "visible !important",
            padding: (t) => t.spacing(1),
            backgroundColor: (theme) =>
              `${theme.palette.background.paper} !important`,
          },
        }}
      >
        <ReactMarkdown
          className="FormattedMarkdown"
          remarkPlugins={[remarkGfm]}
          components={{
            // *********
            // * Links *
            // *********
            a: ({ href, title, children }) => (
              <Link href={href} underline={"always"}>
                {children}
              </Link>
            ),

            // ********
            // * Text *
            // ********
            p: ({ children }) => (
              <Box
                sx={(t) => ({
                  mt: 1,
                  ...t.typography.body1,
                  whiteSpace: "pre-wrap",
                })}
              >
                {children}
              </Box>
            ),
            del: ({ children }) => (
              <Typography sx={{ mt: 1, textDecoration: "line-through" }}>
                {children}
              </Typography>
            ),
            em: ({ children }) => (
              <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                {children}
              </Typography>
            ),
            strong: ({ children }) => (
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                {children}
              </Typography>
            ),
            b: ({ children }) => (
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                {children}
              </Typography>
            ),
            h1: ({ children }) => (
              <Typography gutterBottom sx={{ mt: 2 }} variant={"h1"}>
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography gutterBottom sx={{ mt: 2 }} variant={"h2"}>
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography gutterBottom sx={{ mt: 2 }} variant={"h3"}>
                {children}
              </Typography>
            ),
            h4: ({ children }) => (
              <Typography gutterBottom sx={{ mt: 2 }} variant={"h4"}>
                {children}
              </Typography>
            ),
            h5: ({ children }) => (
              <Typography gutterBottom sx={{ mt: 2 }} variant={"h5"}>
                {children}
              </Typography>
            ),
            h6: ({ children }) => (
              <Typography gutterBottom sx={{ mt: 2 }} variant={"h6"}>
                {children}
              </Typography>
            ),

            // **********
            // * Tables *
            // **********
            table: ({ children }) => (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">{children}</Table>
              </TableContainer>
            ),
            tbody: ({ children }) => <TableBody>{children}</TableBody>,
            // th: ({ children }) => (<TableHead>{children}</TableHead>),
            tr: ({ children }) => <TableRow>{children}</TableRow>,
            td: ({ children }) => (
              <TableCell>
                <Typography>{children}</Typography>
              </TableCell>
            ),

            // *********
            // * Lists *
            // *********
            ol: ({ children }) => (
              <List
                sx={{
                  listStyleType: "decimal",
                  mt: 2,
                  pl: 2,
                  "& .MuiListItem-root": {
                    display: "list-item",
                  },
                }}
              >
                {children}
              </List>
            ),
            ul: ({ children }) => (
              <List
                sx={{
                  listStyleType: "disc",
                  mt: 2,
                  pl: 2,
                  "& .MuiListItem-root": {
                    display: "list-item",
                  },
                }}
              >
                {children}
              </List>
            ),
            li: ({ children, ...props }) => (
              <ListItem sx={{ m: 0, p: 0, ml: 2 }} disableGutters>
                <ListItemText sx={{ pl: 0.25 }}>{children}</ListItemText>
              </ListItem>
            ),

            // ********
            // * Code *
            // ********
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return (
                <SyntaxHighlighter
                  wrapLongLines={true}
                  lineProps={{ style: { flexWrap: "wrap" } }}
                  language={match ? match[1] : undefined}
                  // PreTag="div"
                  style={{
                    ...darkHighlightStyle,
                    hljs: {
                      ...darkHighlightStyle.hljs,
                      // overflow: "visible",
                      display: "inline",
                    },
                    height: "fit-content",
                  }}
                  useInlineStyles
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          {children}
        </ReactMarkdown>
      </Box>
    </ThemeProvider>
  );
}

// https://gist.github.com/boganegru/a4da0b0da0b1233d30b10063b10efa8a
//https://remarkjs.github.io/react-markdown/
// https://commonmark.org/help/
