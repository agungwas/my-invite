const importAll = (r: any) => r.keys().map(r);

const data = importAll(require.context('images/galeri', false, /\.(png|jpe?g|svg)$/));

export default data.map((el: { default: string }) => el.default)