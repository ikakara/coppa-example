const Visibility = {
  HIDDEN: "HIDDEN", // only owner accessible
  DRAFT: "DRAFT", // owner mutable, editors readable
  PRIVATE: "PRIVATE", // editor accessible
  PENDING: "PENDING", // curators and admins
  PUBLIC: "PUBLIC", // public accessible
};
Object.freeze(Visibility);

export { Visibility, }
