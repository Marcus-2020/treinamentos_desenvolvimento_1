/**
 * @typedef {{id: number, nome: string, nomeAlbum: string, nomeAutor: string, anoAlbum: number}} Musica
 */

/**
 * @typedef {Object} EventTargetMusica
 * @property {Musica} data
 */

/**
 * @typedef {EventTarget & EventTargetMusica} EventTargetWithMusica
 */

/** 
 * @typedef {Object} EventMusica
 * @property {EventTargetWithMusica} currentTarget
 */

/**
 * @typedef {Event & EventMusica} EventWithTargetData
 */