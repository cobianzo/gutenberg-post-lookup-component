import styled from 'styled-components';

// Define los estilos utilizando styled-components
const StyledPostLookup = styled.div`

  position: relative;

  .post-lookup {
    position: relative;

    input.components-text-control__input {
      padding-right: 40px; // leave space for the x button
    }

    .x-button {
      position: absolute;
      top: 60px;
      right: 10px;
    }
  }

  ul {
    background: #fffffff4;
    padding: 0 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 1px 7px 9px -9px #000000;
    position: absolute;
    width: 100%;
    top: 44px;

    li {
      padding: 0;
      border-bottom: 1px solid #cccccc;

      button {
        width: 100%;
      }
    }
  }

  button.button--unstyled {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: 0;
    color: var(--wp-components-color-accent, var(--wp-admin-theme-color, #3858e9));
  }
  button.button--unstyled:hover {
    background-color: rgba(var(--wp-admin-theme-color--rgb), .04);
  }
`;

export default StyledPostLookup;
