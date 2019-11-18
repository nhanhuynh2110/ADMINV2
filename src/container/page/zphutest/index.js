import React from 'react'

export default class PhuTest extends React.PureComponent {
  render () {
    return (
      <form>
        <section className='content'>
          <div className="row">
            <div className='col-md-12'>
              <div className='box box-primary collapsed-box'>
                <div class="box-header with-border">
                  <h3 class="box-title">Info</h3>
                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
                  </div>
                </div>
                <div className='box-body' style={{ display: 'block' }}>
                  <div className='row'>
                    <div class="col-md-2">
                      <img class="w-100 camera-image" src="http://localhost:3100/file-manager/gtz5s_1.jpg" />
                    </div>
                    <div className='col-md-5'>
                      <div class="form-group">
                        <label>Title &nbsp;</label>
                        <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="BÌNH MF GTZ5S (12V-3.5AH)" />
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Category &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="ẮC QUY XE GẮN MÁY" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Code &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="GTZ5S" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <div class="form-group">
                        <label>Product Type &nbsp;</label>
                        <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="Phụ Kiện Xe Máy" />
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Producer &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="GS" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Code &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="GTZ5S" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    )
  }
}