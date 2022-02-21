<script>
export default {
  name: 'exSlot',
  props: {
    row: Object,
    render: Function,
  },
  render() {
    return this.$props.render(this.$props.row);
  },
};
</script>