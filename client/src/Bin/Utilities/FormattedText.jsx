import React from "react";
import { default as ReactMarkdown } from "react-markdown";
import {
  Box,
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

import GlobalStyles from "@mui/material/GlobalStyles";

export default function FormattedText({ children }) {
  const theme = useTheme();

  const formattedTextTheme = {
    ...theme,
    typography: {
      // ...theme.typography,
      // h1: {
      //   ...theme.typography.h1,
      //   fontSize: `calc(${theme.typography.h1.fontSize} * .3)`,
      // },
      // h2: {
      //   ...theme.typography.h2,
      //   fontSize: `calc(${theme.typography.h2.fontSize} * .4)`,
      // },
      // h3: {
      //   ...theme.typography.h3,
      //   fontSize: `calc(${theme.typography.h3.fontSize} * .5)`,
      // },
      // h4: {
      //   ...theme.typography.h4,
      //   fontSize: `calc(${theme.typography.h4.fontSize} * .6)`,
      // },
      // h5: {
      //   ...theme.typography.h5,
      //   fontSize: `calc(${theme.typography.h5.fontSize} * .7)`,
      // },
      // h6: {
      //   ...theme.typography.h6,
      //   fontSize: `calc(${theme.typography.h6.fontSize} * .8)`,
      // },
      // h6: {
      //   ...theme.typography.h6,
      //   fontSize: `calc(${theme.typography.h6.fontSize} * .8)`,
      // },
    },
  };

  const zips = [
    [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "subtitle1",
      "subtitle2",
      "body1",
      "body2",
      "button",
      "caption",
      "overline",
    ],
    [
      ".4",
      ".5",
      ".6",
      ".7",
      ".8",
      ".8",
      ".8",
      ".8",
      ".8",
      ".8",
      ".8",
      ".8",
      ".8",
    ],
  ];

  zips[0].forEach((name, i) => {
    formattedTextTheme.typography[name] = {
      ...theme.typography[name],
      fontSize: `calc(${theme.typography[name].fontSize} * ${zips[1][i]} )`,
    };
  });

  return (
    <ThemeProvider theme={formattedTextTheme}>
      <Box
        sx={{
          "& pre": {
            overflowY: "visible !important",
            overflowX: "visible !important",
            padding: theme.spacing(1),
            backgroundColor: `${theme.palette.background.paper} !important`,
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
