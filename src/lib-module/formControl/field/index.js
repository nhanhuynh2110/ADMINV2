import Field from './field'
import {Input, Select, CheckBox, Area, InputPhone,
  InputGroups, Image as FileManagerImage, Galleries as FileManagerGalleries,
  EditorTiny, InputColorPicker} from '../control'

Field.Input = Input
Field.Input.Phone = InputPhone
Field.Input.Groups = InputGroups
Field.Input.ColorPicker = InputColorPicker
Field.Select = Select
Field.CheckBox = CheckBox
Field.Area = Area
Field.FileImage = FileManagerImage
Field.FileGalleries = FileManagerGalleries
Field.Tiny = EditorTiny
export default Field
