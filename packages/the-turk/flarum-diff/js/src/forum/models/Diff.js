import Model from 'flarum/common/Model';
import mixin from 'flarum/common/utils/mixin';

export default class Diff extends mixin(Model, {
  revision: Model.attribute('revision'),
  createdAt: Model.attribute('createdAt', Model.transformDate),
  deletedAt: Model.attribute('deletedAt', Model.transformDate),
  rollbackedAt: Model.attribute('rollbackedAt', Model.transformDate),
  actor: Model.hasOne('actor'),
  deletedUser: Model.hasOne('deletedUser'),
  rollbackedUser: Model.hasOne('rollbackedUser'),
  inlineHtml: Model.attribute('inlineHtml'),
  sideBySideHtml: Model.attribute('sideBySideHtml'),
  combinedHtml: Model.attribute('combinedHtml'),
  previewHtml: Model.attribute('previewHtml'),
  comparisonBetween: Model.attribute('comparisonBetween'),
}) {}
