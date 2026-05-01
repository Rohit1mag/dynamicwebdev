import { css } from "@unbndl/html";

// copy of reset.css for shadow dom (prof showed this pattern in lecture)
const styles = css`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
  }
`;

export default { styles };
