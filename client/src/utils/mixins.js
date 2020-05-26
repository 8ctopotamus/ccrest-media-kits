export default {
  container: `
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 30px;
  `,
  grid: function(props) {
    return `
      display: grid;
      grid-template-columns: ${props.columns ? props.columns : '1fr 1fr'};
      @media (max-width: 767px) {
        display: block;
      }
    `
  },
}