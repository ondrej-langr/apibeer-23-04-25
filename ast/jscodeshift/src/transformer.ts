import type {
  API,
  FileInfo,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
} from "jscodeshift";
import recastTypescriptParser from "recast/parsers/typescript";

export function isJsxIdentifier(
  item: JSXIdentifier | JSXNamespacedName | JSXMemberExpression,
): item is JSXIdentifier {
  return item.type === "JSXIdentifier";
}

const removePropsIdentifiers = new Set(["endIcon", "startIcon"]);

const componentIdentifierName = "IconButton";

export default function dataGridTransform(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Remove all occurrences of deprecated props
  root
    .find(
      j.JSXOpeningElement,
      ({ name }) =>
        isJsxIdentifier(name) && name.name === componentIdentifierName,
    )
    .find(
      j.JSXAttribute,
      ({ name }) =>
        isJsxIdentifier(name) && removePropsIdentifiers.has(name.name),
    )
    .remove();

  return root.toSource({
    quote: "single",
    tabWidth: 2,
    lineTerminator: "\n",
    parser: recastTypescriptParser,
  });
}
