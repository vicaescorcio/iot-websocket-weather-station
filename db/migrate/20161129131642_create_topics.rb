class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :station
      t.string :sensor
      t.string :location

      t.timestamps null: false
    end
  end
end
